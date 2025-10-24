from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

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

    def __str__(self):
        return self.title