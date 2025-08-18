from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from apps.product.models import Product
from apps.product.serializers import ProductSerializer
from apps.category.models import Category

from django.db.models import Q, F

class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': "Producto no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

        if Product.objects.filter(id=product_id).exists():
            product = Product.objects.get(id=product_id)

            product = ProductSerializer(product, context={'request': request})

            return Response({'product': product.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': "El producto no existe"},
                status=status.HTTP_404_NOT_FOUND
            )
        
class ListProductsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        sortBy = request.query_params.get('sortBy')

        if not (sortBy == 'date_created' or sortBy == 'price' or sortBy == 'sold' or sortBy == 'name'):
            sortBy = 'date_created'
        
        order = request.query_params.get('order')
        limit = request.query_params.get('limit')

        if not limit:
            limit = 6
        
        try:
            limit = int(limit)
        except:
            return Response(
                {'error': 'Limit must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        
        if limit <= 0:
            limit = 6
        
        if order == 'desc':
            sortBy = '-' + sortBy
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        elif order == 'asc':
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        else:
            products = Product.objects.order_by(sortBy).all()

        
        products = ProductSerializer(products, many=True, context={'request': request})

        if products:
            
            return Response({'products': products.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products to list'},
                status=status.HTTP_404_NOT_FOUND)
        

class ListSearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        
        try:
            category_id = int(data['category_id'])
           
        except:
            return Response(
                {'error': 'Categoria id debe ser un integer'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        search = data['search']

        #Chequear si hay input ocurrio en la busqueda
        if len(search) == 0:
            #Mostrar todos los productos si no hay input en la busqueda
            search_results = Product.objects.order_by('-date_created').all()
        else:
            #Si hay criterio de busqueda, filtramos con dicho criterio usando Q
            search_results = Product.objects.filter(
            Q(description__icontains=search) | Q(name__icontains=search)
            )

        if category_id == 0:
            search_results = ProductSerializer(search_results, many=True, context={'request': request})
            return Response(
                {'search_products': search_results.data},
                status=status.HTTP_200_OK
            )
        

        #Revisar si existe categoria
        if not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'Categoria no encontrada'},
                status=status.HTTP_404_NOT_FOUND
            )
        

        category = Category.objects.get(id=category_id)

        #Si la categoria tiene un padre, filtrar solo por la categoria y no el padre 
        if category.parent:
            search_results = search_results.order_by('-date_created').filter(category=category)
        else:
            #si esta categoria padre no tiene hijos filtar solo la categoria
            if not Category.objects.filter(parent=category).exists():
                search_results = search_results.order_by('-date_created').filter(parent=category)
            else:
                categories = Category.objects.filter(parent=category)
                filterd_categories = [category]

                for cat in categories:
                    filterd_categories.append(cat)

                filterd_categories = tuple(filterd_categories)

                search_results = search_results.order_by('-date_created').filter(category__in=filterd_categories)

        
        search_results = ProductSerializer(search_results, many=True, context={'request': request})
        return Response({'search_products': search_results.data}, status=status.HTTP_200_OK)
    


class ListRelatedView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_Id = int(productId)
        except:
            return Response(
                {'error': 'Producto Id debe ser entero'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Existe el producto id
        if not Product.objects.filter(id=product_Id).exists():
            return Response(
                {'error': "El producto con este producto Id no existe"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        category = Product.objects.get(id=product_Id).category

        if Product.objects.filter(category=category).exists():
            #Si la categoria tiene padre filtrar solo por la categoria y no el padre
            if category.parent:
                related_products = Product.objects.order_by('-sold').filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    related_products = Product.objects.order_by('-sold').filter(category=category)

                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)
                        
                    filtered_categories = tuple(filtered_categories)

                    related_products = Product.objects.order_by('-date_created').filter(category__in=filtered_categories)

                
            #excuir productos que estamos viendo
            related_products = related_products.exclude(id=product_Id)
            related_products = ProductSerializer(related_products, many=True)

            if len(related_products.data) > 3:
                return Response(
                    {'related_products': related_products.data[:3]},
                    status=status.HTTP_200_OK
                )
            elif len(related_products.data) > 0:
                return Response(
                    {'related_products': related_products.data},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'No se encontraron productos relacionados'},
                    status=status.HTTP_200_OK
                )
            
        else:
            return Response(
                {'error': 'No se encontraron productos relacionados'},
                    status=status.HTTP_200_OK              
            )
        

class ListBySearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        

        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Categoria id debe ser un integer'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        price_range = data['price_range']
        sort_by = data['sort_by']
       
        if not (sort_by == 'data_created' or sort_by == 'price' or sort_by == 'sold' or sort_by == 'name'):
            sort_by = 'date_created'

        
        order = data['order']

        #Si categoriId es = 0, filtrar todas las categorias
        if category_id == 0:
            product_results = Product.objects.all()
        elif not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'Esta categoria no existe'},
                status=status.HTTP_404_NOT_FOUND
            )
        else:
            category = Category.objects.get(id=category_id)
            if category.parent:
                #Si la categoria tiene padre filtrar solo por la categoria y no el padre
                product_results = Product.objects.filter(category = category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    product_results = Product.objects.filter(category=category)
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)
                    
                    filtered_categories = tuple(filtered_categories)
                    product_results = Product.objects.filter(category__in=filtered_categories)

        #Filrar por precios
        if price_range == '1 - 19':
            product_results = product_results.filter(price__gte=1)
            product_results = product_results.filter(price__lt=20)
        elif price_range == '20 - 39':
            product_results = product_results.filter(price__gte=20)
            product_results = product_results.filter(price__lt=40)
        elif price_range == '40 - 59':
            product_results = product_results.filter(price__gte=40)
            product_results = product_results.filter(price__lt=60)
        elif price_range == '60 - 79':
            product_results = product_results.filter(price__gte=60)
            product_results = product_results.filter(price__lt=80)
        elif price_range == 'Mas que 80':
            product_results = product_results.filter(price__gte=80)

        

        #filtrar producto por sorrt_by
        if order == 'desc':
            sort_by = '-' + sort_by
            product_results = product_results.order_by(sort_by)
        elif order == 'asc':
            product_results = product_results.order_by(sort_by)
        else:
            product_results = product_results.order_by(sort_by)

        product_results = ProductSerializer(product_results)

        if len(product_results.data) > 0:
            return Response(
                {'filtered_products': product_results.data},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'No se encontraron productos'},
                status=status.HTTP_200_OK
            )
        


class ComparePriceView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        
        products = Product.objects.filter(compare_price__gte = 0, compare_price__gt = F('price'))

        products = ProductSerializer(products, many=True, context={'request': request})

        if products:
            
            return Response({'products': products.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products to list'},
                status=status.HTTP_404_NOT_FOUND)