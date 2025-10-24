from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User

# Create your models here.

class Recipe(models.Model):
    name = models.CharField(max_length=100)
    difficulty = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(10)
        ]
    )
    ingredients = models.TextField()
    date_published = models.DateField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')

    def __str__(self):
        return self.title