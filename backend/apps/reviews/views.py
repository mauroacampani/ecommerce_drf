from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.product.models import Product
from .models import Review

class GetProductReviewsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'El ID del producto debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'El producto no existe'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            product = Product.objects.get(id=product_id)

            results = []

            if Review.objects.filter(product=product).exists():
                reviews = Review.objects.order_by(
                    '-date_created'
                ).filter(product=product_id)

                for review in reviews:
                    item={}

                    item['id'] = review.id
                    item['rating'] = review.rating
                    item['comment'] = review.comment
                    item['date_created'] = review.date_created
                    item['user'] = review.user.first_name

                    results.append(item)

            return Response(
                {'reviews': results},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Algo salio mal al obtener el reviews'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class GetProductReviewView(APIView):
    def get(self, request, productoId, format=None):
        user = user.request.user

        try:
            product_id = int(productoId)
        except:
            return Response(
                {'error': 'El ID del producto debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'El producto no existe'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            product = Product.objects.get(id=product_id)

            result = {}

            if Review.objects.filter(user=user, product=product).exists():
                review = Review.objects.get(user=user, product=product)

                result['id'] = review.id
                result['rating'] = review.rating
                result['comment'] = review.comment
                result['date_created'] = review.date_created
                result['user'] = review.user.first_name

            return Response(
                {'review': result},
                status=status.HTTP_200_OK
            )

        except:
            return Response(
                {'error': 'Algo salio mal al obtener el reviews'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class CreateProductReviewView(APIView):
    def post(self, request, productId, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'El ID del producto debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            rating = float(data['rating'])
        except:
            return Response(
                {'error': 'El rating debe ser un valor decimal'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            comment = str(data['comment'])
        except:
            return Response(
                {'error': 'Debe pasar un comentario al crear una reseña.'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'El producto no existe'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            product = Product.objects.get(id=product_id)

            result = {}
            results = []

            if Review.objects.filter(user=user, product=product).exists():
                return Response(
                    {'error': 'Review para el producto ya fue creada'},
                    status=status.HTTP_409_CONFLICT
                )
            

            review = Review.objects.create(
                user=user, 
                product=product,
                rating=rating,
                comment=comment
                )
            
            if Review.objects.filter(user=user, product=product).exists():

                result['id'] = review.id
                result['rating'] = review.rating
                result['comment'] = review.comment
                result['date_created'] = review.date_created
                result['user'] = review.user.first_name

                reviews = Review.objects.order_by('-date_created').fitler(
                    product=product
                )

                for review in reviews:
                    item={}

                    item['id'] = review.id
                    item['rating'] = review.rating
                    item['comment'] = review.comment
                    item['date_created'] = review.date_created
                    item['user'] = review.user.first_name

                    results.append(item)
            
            return Response(
                {'review': result, 'reviews': results},
                status=status.HTTP_201_CREATED
            )

        except:
            return Response(
                {'error': 'Algo salio mal al obtener el reviews'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class UpdateProductReviewView(APIView):
    def put(self, request, productId, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'El ID del producto debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            rating = float(data['rating'])
        except:
            return Response(
                {'error': 'El rating debe ser un valor decimal'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            comment = str(data['comment'])
        except:
            return Response(
                {'error': 'Debe pasar un comentario al crear una reseña.'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'El producto no existe'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            product = Product.objects.get(id=product_id)

            result = {}
            results = []

            if Review.objects.filter(user=user, product=product).exists():
                return Response(
                    {'error': 'Review para el producto ya fue creada'},
                    status=status.HTTP_409_CONFLICT
                )
            

            if not Review.objects.filter(user=user, product=product).exists():
                return Response(
                    {'error': 'Review para este producto no existe'},
                    status=status.HTTP_409_CONFLICT
                )
            
            if Review.objects.filter(user=user, product=product).exists():
                Review.objects.filter(user=user, product=product).update(
                    rating=rating,
                    comment=comment
                )

                review = Review.objects.get(user=user, product=product)

                result['id'] = review.id
                result['rating'] = review.rating
                result['comment'] = review.comment
                result['date_created'] = review.date_created
                result['user'] = review.user.first_name

                reviews = Review.objects.order_by('-date_created').fitler(
                    product=product
                )

                for review in reviews:
                    item={}

                    item['id'] = review.id
                    item['rating'] = review.rating
                    item['comment'] = review.comment
                    item['date_created'] = review.date_created
                    item['user'] = review.user.first_name

                    results.append(item)
            
            return Response(
                {'review': result, 'reviews': results},
                status=status.HTTP_201_CREATED
            )
            
        except:
            return Response(
                {'error': 'Algo salio mal al obtener el reviews'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class DeleteProductReviewView(APIView):
    def delete(self, request, productId, format=None):
        user = self.request.user

        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'El ID del producto debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'Este producto no existe'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            product = Product.objects.get(id=product_id)

            results = []

            if Review.objects.filter(user=user, product=product).exists():
                Review.objects.filter(user=user, product=product).delete()

                reviews = Review.objects.order_by('-date_created').filter(
                    product=product
                )

                for review in reviews:
                    item={}

                    item['id'] = review.id
                    item['rating'] = review.rating
                    item['comment'] = review.comment
                    item['date_created'] = review.date_created
                    item['user'] = review.user.first_name

                    results.append(item)
            
                return Response(
                    {'reviews': results},
                    status=status.HTTP_201_CREATED
                )
        
            else:
                return Response(
                    {'error': 'La reseña para este producto no existe'},
                    status=status.HTTP_404_NOT_FOUND
                )
                
        except:
            return Response(
                {'error': 'Algo salio mal al obtener el reviews'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class FilterProductReviewsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'El ID del producto debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        if not Product.objects.filter(id=product_id).exists():
            return Response(
                {'error': 'Este producto no existe'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        product = Product.objects.get(id=product_id)

        rating = request.query_params.get('rating')

        try:
            rating = float(rating)
        except:
            return Response(
                {'error': 'El rating debe ser un valor decimal'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            if not rating:
                rating = 5.0
            elif rating > 5.0:
                rating = 5.0
            elif rating < 0.5:
                rating = 0.5

            results = []

            if Review.objects.filter(product=product).exists():
                if rating == 0.5:
                    reviews = Review.objects.order_by('-date_created').filter(
                        rating=rating, product=product
                    )
                else:
                    reviews = Review.objects.order_by('-date_created').filter(
                        rating__lte=rating, 
                        product=product
                    ).filter(
                        rating__gte=(rating - 0.5),
                        product=product
                    )

                for review in reviews:
                    item={}

                    item['id'] = review.id
                    item['rating'] = review.rating
                    item['comment'] = review.comment
                    item['date_created'] = review.date_created
                    item['user'] = review.user.first_name

                    results.append(item)
            
            return Response(
                {'reviews': results},
                status=status.HTTP_201_CREATED
            )


        except:
            return Response(
                {'error': 'Algo salio mal al foiltar la reseña por producto'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



