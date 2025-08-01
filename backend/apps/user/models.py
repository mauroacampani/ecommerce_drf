from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from apps.cart.models import Cart
from apps.user_profile.models import UserProfile
from apps.wishlist.models import WishList

#Creacion de un usuario
class UserAccountManager(BaseUserManager):
    #Creacion de un usuario
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El usuario debe tener una dirección de correo electrónico")
        
        email= self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        #Crea un carrito al crear un usuario 
        shopping_cart = Cart.objects.create(user = user)
        shopping_cart.save() 

        #Se crea el perfil del usuario 
        profile = UserProfile.objects.create(user = user)
        profile.save()

        #Se crea el wishlist
        wishlist = WishList.objects.create(user = user)
        wishlist.save()

        return user
    
    #Creacion de un super usuario
    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
    



class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email
            