from django.urls import path
from . import views

urlpatterns = [
    path("recipes/", view=views.RecipePostListCreate.as_view(), name="get-recipe-list"),
    path("recipes/<int:pk>/", view=views.RecipeDeleteUpdate.as_view(), name='update-delete-recipe'),
    path("ingredients/",view=views.IngredientListCreate.as_view(), name='get-ingredients' )
]