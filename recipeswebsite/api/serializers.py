from rest_framework import serializers
from .models import Recipe, Ingredient
from django.contrib.auth.models import User

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["id", "name", "category", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class IngredientSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["id", "name"] 

class RecipeSerializer(serializers.ModelSerializer):

    ingredients = IngredientSimpleSerializer(many=True, read_only=True)
    ingredients_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Ingredient.objects.all(), write_only=True, source='ingredients', required=False,
    )
    class Meta:
        model = Recipe
        fields = ["id", "title", "difficulty", "instructions", "ingredients_ids", "ingredients", "date_published", "author"]
        extra_kwargs = {"author": {"read_only": True}}

    def get_fields(self):
        """Filter ingredients to only the user's own ones."""
        fields = super().get_fields()
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            fields["ingredients_ids"].queryset = Ingredient.objects.filter(author=request.user)
        return fields


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user