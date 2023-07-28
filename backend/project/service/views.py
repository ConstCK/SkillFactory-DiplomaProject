from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions, viewsets

from .models import Car, Maintenance, Complaint
from .serializers import CarSerializer, ComplaintSerializer, MaintenanceSerializer


class CarViewSet(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()


class MaintenanceViewSet(viewsets.ModelViewSet):
    serializer_class = MaintenanceSerializer
    queryset = Maintenance.objects.all()


class ComplaintViewSet(viewsets.ModelViewSet):
    serializer_class = ComplaintSerializer
    queryset = Complaint.objects.all()


# Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="Сервисное обслуживание погрузчиков",
        default_version='v1',
        description="Use methods below for data access",

    ),
    public=False,
    permission_classes=[permissions.AllowAny],
)
