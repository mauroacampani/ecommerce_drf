from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from apps.cart.models import Cart, CartItem
from apps.orders.models import Order, OrderItem
from apps.shipping.models import Shipping
from django.core.mail import send_mail
from apps.product.models import Product
import braintree

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=braintree.Environment.Sandbox,
        merchant_id=settings.BT_MERCHANT_ID,
        public_key=settings.BT_PUBLIC_KEY,
        private_key=settings.BT_PRIVATE_KEY
    )
)

class GenerateTokenView(APIView):
    def get(self, request, format=None):
        try:
            token = gateway.client_token.generate()
            
            return Response(
                {'braintree_token': token},
                status=status.HTTP_200_OK
            )
        except:
 
            return Response(
                {'error': 'Something went wrong when retrieving braintree token'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class GetPaymentTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        tax = 0.18

        shipping_id = request.query_params.get('shipping_id')
        shipping_id = str(shipping_id)

        try:
            cart = Cart.objects.get(user=user)

            #revisar si existen iitems
            if not CartItem.objects.filter(cart=cart).exists():
                return Response(
                    {'error': 'Need to have items in cart'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            cart_items = CartItem.objects.filter(cart=cart)

            for cart_item in cart_items:
                if not Product.objects.filter(id=cart_item.product.id).exists():
                    return Response(
                        {'error': 'A proudct with ID provided does not exist'},
                        status=status.HTTP_404_NOT_FOUND
                    )
                if int(cart_item.count) > int(cart_item.product.quantity):
                    return Response(
                        {'error': 'Not enough items in stock'},
                        status=status.HTTP_200_OK
                    )
                
                total_amount = 0.0
                total_compare_amount = 0.0

                for cart_item in cart_items:
                    total_amount += (float(cart_item.product.price)
                                    * float(cart_item.count))
                    total_compare_amount += (float(cart_item.product.compare_price)
                                            * float(cart_item.count))

                total_compare_amount = round(total_compare_amount, 2)
                original_price = round(total_amount, 2)

                # Impuesto estimado
                estimated_tax = round(total_amount * tax, 2)

                total_amount += (total_amount * tax)

                shipping_cost = 0.0
                # verificar que el envio sea valido
                if Shipping.objects.filter(id__iexact=shipping_id).exists():
                    # agregar shipping a total amount
                    shipping = Shipping.objects.get(id=shipping_id)
                    shipping_cost = shipping.price
                    total_amount += float(shipping_cost)
                

                total_amount = round(total_amount, 2)

                return Response({
                    'original_price': f'{original_price:.2f}',
                    'total_amount': f'{total_amount:.2f}',
                    'total_compare_amount': f'{total_compare_amount:.2f}',
                    'estimated_tax': f'{estimated_tax:.2f}',
                    'shipping_cost': f'{shipping_cost:.2f}'
                },
                    status=status.HTTP_200_OK
                )

        except:
            return Response(
                {'error': 'Something went wrong when retrieving payment total information'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

# class ProcessPaymentView(APIView):
   
#     def post(self, request, format=None):
#         user = self.request.user
#         data = self.request.data

#         tax = 0.18

#         nonce = data['nonce']
#         shipping_id = str(data['shipping_id'])

#         #cupon

#         full_name = data['full_name']
#         address_line_1 = data['address_line_1']
#         address_line_2 = data['address_line_2']
#         city = data['city']
#         state_province_region = data['state_province_region']
#         postal_zip_code = data['postal_zip_code']
#         country_region = data['country_region']
#         telephone_number = data['telephone_number']

#         # revisar si datos de shipping son validos
#         if not Shipping.objects.filter(id__iexact=shipping_id).exists():
#             return Response(
#                 {'error': 'Shipping invalido'},
#                 status=status.HTTP_404_NOT_FOUND
#             )
        
#         cart = Cart.objects.get(user=user)

#         #revisar si usuario tiene items en carrito
#         if not CartItem.objects.filter(cart=cart).exists():
#             return Response(
#                 {'error': 'Necesitar tener items en el carrito'},
#                 status=status.HTTP_404_NOT_FOUND
#             )
        
#         cart_items = CartItem.objects.filter(cart=cart)

#         #Revisa si hay stock
#         for cart_item in cart_items:
#             if not Product.objects.filter(id=cart_item.product.id).exists():
#                 return Response(
#                     {'error': 'El producto id no existe'},
#                     status=status.HTTP_404_NOT_FOUND
#                 )
#             if int(cart_item.count) > int(cart_item.product.quantity):
#                 return Response(
#                     {'error': 'No hay suficiente en stock'},
#                     status=status.HTTP_200_OK
#                 )
            
#         total_amount = 0.0

#         for cart_item in cart_items:
#             total_amount += (float(cart_item.product.price) * float(cart_item.count))

#         #cupones
#         # ==============

#         total_amount += (total_amount * tax)

#         shipping = Shipping.objects.get(id=int(shipping_id))

#         shipping_name = shipping.name
#         shipping_time = shipping.time_to_delivery
#         shipping_price = shipping.price

#         total_amount += float(shipping_price)
#         total_amount = round(total_amount, 2)

#         try:
#             # Crear transaccion con braintree
#             newTransaction = gateway.transaction.sale(
#                 {
#                     'amount': str(total_amount),
#                     'payment_method_nonce': str(nonce['nonce']),
#                     'options': {
#                         'submit_for_settlement': True
#                     }
#                 }
#             )
#         except:
#             return Response(
#                 {'error': 'Error al procesar la transaccion'},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
        
        
#         if newTransaction.is_success or newTransaction.transaction:
#             for cart_item in cart_items:
#                 update_product = Product.objects.get(id=cart_item.product.id)

#                 #encontrar cantidad despues de coompra
#                 quantity = int(update_product.quantity) - int(cart_item.count)

#                 #obtener cantidad de producto por vender
#                 sold = int(update_product.sold) + int(cart_item.count)

#                 #actualizar el producto
#                 Product.objects.filter(id=cart_item.product.id).update(
#                     quantity=quantity, sold=sold
#                 )

#             #crear orden
#             try:
#                 order = Order.objects.create(
#                     user=user,
#                     transaction_id=newTransaction.transaction.id,
#                     amount=total_amount,
#                     full_name=full_name,
#                     address_line_1=address_line_1,
#                     address_line_2=address_line_2,
#                     city=city,
#                     state_province_region=state_province_region,
#                     postal_zip_code=postal_zip_code,
#                     country_region=country_region,
#                     telephone_number=telephone_number,
#                     shipping_name=shipping_name,
#                     shipping_time=shipping_time,
#                     shipping_price=float(shipping_price)
#                 )
#             except:
#                 return Response(
#                     {'error': 'La transacción fue exitosa pero no se logró crear el pedido'},
#                     status=status.HTTP_500_INTERNAL_SERVER_ERROR
#                 )
            
#             for cart_item in cart_items:
#                 try:
#                     # agarrar el producto
#                     product = Product.objects.get(id=cart_item.product.id)

#                     OrderItem.objects.create(
#                         product=product,
#                         order=order,
#                         name=product.name,
#                         price=cart_item.product.price,
#                         count=cart_item.count
#                     )
#                 except:
#                     return Response(
#                         {'error': 'La transacción fue exitosa y se creó el pedido, pero no se logró crear un artículo del pedido.'},
#                         status=status.HTTP_500_INTERNAL_SERVER_ERROR
#                     )
                
#             try:
#                 send_mail(
#                     'Detalles del pedido',
#                     'Hola ' + full_name + ','
#                     + '\n\n¡Hemos recibido tu pedido!'
#                     + '\n\nDanos algo de tiempo para procesar tu pedido y enviártelo.'
#                     + '\n\nPuedes ir a tu panel de usuario para comprobar el estado de tu pedido.'
#                     + '\n\nAtentamente,'
#                     + '\nMauro',
#                     'mauroac26@gmail.com',
#                     [user.email],
#                     fail_silently=False
#                 )
#             except:
#                 return Response(
#                     {'error': 'La transacción se realizó correctamente y se creó el pedido, pero no se pudo enviar el correo electrónico.'},
#                     status=status.HTTP_500_INTERNAL_SERVER_ERROR
#                 )

#             try:
#                 # Vaciar carrito de compras
#                 CartItem.objects.filter(cart=cart).delete()

#                 # Actualizar carrito
#                 Cart.objects.filter(user=user).update(total_items=0)
#             except:
#                 return Response(
#                     {'error': 'La transacción fue exitosa y el pedido fue exitoso, pero no se pudo vaciar el carrito.'},
#                     status=status.HTTP_500_INTERNAL_SERVER_ERROR
#                 )
            
#             return Response(
#                 {'success': 'Transacción exitosa y pedido creado'},
#                 status=status.HTTP_200_OK
#             )
#         else:
#             return Response(
#                 {'error': 'Transaccion fallida'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

class ProcessPaymentView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        tax = 0.18

        nonce = data['nonce']
        shipping_id = str(data['shipping_id'])
  

        full_name = data['full_name']
        address_line_1 = data['address_line_1']
        address_line_2 = data['address_line_2']
        city = data['city']
        state_province_region = data['state_province_region']
        postal_zip_code = data['postal_zip_code']
        country_region = data['country_region']
        telephone_number = data['telephone_number']

        

        # revisar si datos de shipping son validos
        if not Shipping.objects.filter(id__iexact=shipping_id).exists():
            return Response(
                {'error': 'Invalid shipping option'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        cart = Cart.objects.get(user=user)

        #revisar si usuario tiene items en carrito
        if not CartItem.objects.filter(cart=cart).exists():
            return Response(
                {'error': 'Need to have items in cart'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        cart_items = CartItem.objects.filter(cart=cart)

        # revisar si hay stock

        for cart_item in cart_items:
            if not Product.objects.filter(id=cart_item.product.id).exists():
                return Response(
                    {'error': 'Transaction failed, a proudct ID does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
            if int(cart_item.count) > int(cart_item.product.quantity):
                return Response(
                    {'error': 'Not enough items in stock'},
                    status=status.HTTP_200_OK
                )
        
        total_amount = 0.0

        for cart_item in cart_items:
            total_amount += (float(cart_item.product.price)
                             * float(cart_item.count))
        
        # Cupones
 

        total_amount += (total_amount * tax)

        shipping = Shipping.objects.get(id=int(shipping_id))

        shipping_name = shipping.name
        shipping_time = shipping.time_to_delivery
        shipping_price = shipping.price

        total_amount += float(shipping_price)
        total_amount = round(total_amount, 2)
        
        try:
            newTransaction = gateway.transaction.sale({
                'amount': str(total_amount),
                'payment_method_nonce': nonce,
                'options': {
                    'submit_for_settlement': True
                }
            })

           
            # else:
            #     # Esto captura el error específico que da Braintree
            #     return Response(
            #         {'error': str(newTransaction.message)},
            #         status=status.HTTP_400_BAD_REQUEST
            #     )

        except Exception as e:
            print(f'ERROR EN LA TRANSACCIÓN: {e}')
            return Response(
                {'error': 'Error processing the transaction', 'detail': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        # try:
        #     # Crear transaccion con braintree
        #     newTransaction = gateway.transaction.sale(
        #         {
        #             'amount': str(total_amount),
        #             'payment_method_nonce': nonce,
        #             'options': {
        #                 'submit_for_settlement': True
        #             }
        #         }
        #     )
        # except:
        #     return Response(
        #         {'error': 'Error processing the transaction'},
        #         status=status.HTTP_500_INTERNAL_SERVER_ERROR
        #     )
        
        if newTransaction.is_success:
            
            for cart_item in cart_items:
                
                update_product = Product.objects.get(id=cart_item.product.id)
                
                #encontrar cantidad despues de coompra
                quantity = int(update_product.quantity) - int(cart_item.count)

                #obtener cantidad de producto por vender
                sold = int(update_product.sold) + int(cart_item.count)

                #actualizar el producto
                Product.objects.filter(id=cart_item.product.id).update(
                    quantity=quantity, sold=sold
                )
            
        
            #crear orden
            try:
                order = Order.objects.create(
                    user=user,
                    transaction_id=newTransaction.transaction.id,
                    amount=total_amount,
                    full_name=full_name,
                    address_line_1=address_line_1,
                    address_line_2=address_line_2,
                    city=city,
                    state_province_region=state_province_region,
                    postal_zip_code=postal_zip_code,
                    country_region=country_region,
                    telephone_number=telephone_number,
                    shipping_name=shipping_name,
                    shipping_time=shipping_time,
                    shipping_price=float(shipping_price)
                )
            except:
                return Response(
                    {'error': 'Transaction succeeded but failed to create the order'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            print(order)
            for cart_item in cart_items:
                try:
                    # agarrar el producto
                    product = Product.objects.get(id=cart_item.product.id)

                    OrderItem.objects.create(
                        product=product,
                        order=order,
                        name=product.name,
                        price=cart_item.product.price,
                        count=cart_item.count
                    )
                except:
                    return Response(
                        {'error': 'Transaction succeeded and order created, but failed to create an order item'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

            try:
                send_mail(
                    'Your Order Details',
                    'Hey ' + full_name + ','
                    + '\n\nWe recieved your order!'
                    + '\n\nGive us some time to process your order and ship it out to you.'
                    + '\n\nYou can go on your user dashboard to check the status of your order.'
                    + '\n\nSincerely,'
                    + '\nShop Time',
                    'mail@ninerogues.com',
                    [user.email],
                    fail_silently=False
                )
            except:
                return Response(
                    {'error': 'Transaction succeeded and order created, but failed to send email'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            try:
                # Vaciar carrito de compras
                CartItem.objects.filter(cart=cart).delete()

                # Actualizar carrito
                Cart.objects.filter(user=user).update(total_items=0)
            except:
                return Response(
                    {'error': 'Transaction succeeded and order successful, but failed to clear cart'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            return Response(
                {'success': 'Transaction successful and order was created'},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'Transaction failed'},
                status=status.HTTP_400_BAD_REQUEST
            )

        
