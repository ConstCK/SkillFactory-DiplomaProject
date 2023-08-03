from django.urls import path, include
from rest_framework import routers

from .views import CarViewSet, MaintenanceViewSet, ComplaintViewSet, UserInfoViewSet, VehicleViewSet, EngineViewSet, \
    TransmissionViewSet, DrivingAxleViewSet, SteeringAxleViewSet, MaintenanceTypeViewSet, BreakageViewSet, \
    RepairViewSet, ServiceCompanyViewSet, my_login, get_definite_car, get_clients_cars, get_service_companies_cars, \
    get_clients_maintenance, get_service_companies_maintenance, get_clients_complaints,\
    get_service_companies_complaints

router = routers.DefaultRouter()
router.register('cars', CarViewSet)
router.register('maintenance', MaintenanceViewSet)
router.register('complaints', ComplaintViewSet)
router.register('users', UserInfoViewSet)
router.register('vehicles', VehicleViewSet)
router.register('engines', EngineViewSet)
router.register('transmissions', TransmissionViewSet)
router.register('driving-axles', DrivingAxleViewSet)
router.register('steering-axles', SteeringAxleViewSet)
router.register('maintenance-types', MaintenanceTypeViewSet)
router.register('breakages', BreakageViewSet)
router.register('repair-ways', RepairViewSet)
router.register('service-companies', ServiceCompanyViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api/user-login/', my_login),
    path('api/definite-car/', get_definite_car),
    path('api/clients-cars/', get_clients_cars),
    path('api/service-companies-cars/', get_service_companies_cars),
    path('api/clients-maintenance/', get_clients_maintenance),
    path('api/service-companies-maintenance/', get_service_companies_maintenance),
    path('api/clients-complaints/', get_clients_complaints),
    path('api/service-companies-complaints/', get_service_companies_complaints),
]
