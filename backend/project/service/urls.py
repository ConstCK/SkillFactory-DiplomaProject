from django.urls import path, include
from rest_framework import routers

from .views import CarViewSet, MaintenanceViewSet, ComplaintViewSet

router = routers.DefaultRouter()
router.register('cars', CarViewSet)
router.register('maintenance', MaintenanceViewSet)
router.register('complaints', ComplaintViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]
