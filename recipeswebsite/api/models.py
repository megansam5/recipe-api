from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User

# Create your models here.

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ingredients')

    def __str__(self):
        return f"{self.name} ({self.category})"

class Recipe(models.Model):
    title = models.CharField(max_length=100)
    difficulty = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(10)
        ]
    )
    instructions = models.TextField()
    ingredients = models.ManyToManyField(Ingredient, related_name='recipes')
    date_published = models.DateField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')

    def __str__(self):
        return self.title