from django.urls import path
from . import views

urlpatterns = [
    path("recipes/", view=views.RecipePostListCreate.as_view(), name="recipe-list")
]