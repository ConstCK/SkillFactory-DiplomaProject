from django.contrib.auth.models import User
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import Car, Maintenance, Complaint, Vehicle, Engine, Transmission, DrivingAxle, SteeringAxle, \
    MaintenanceType, Breakage, Repair, ServiceCompany
from .serializers import CarSerializer, ComplaintSerializer, MaintenanceSerializer, UserSerializer, \
    VehicleSerializer, EngineSerializer, TransmissionSerializer, DrivingAxleSerializer, SteeringAxleSerializer, \
    MaintenanceTypeSerializer, BreakageSerializer, RepairSerializer, ServiceCompanySerializer


class CarViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CarSerializer
    queryset = Car.objects.all()

    @action(detail=True, methods=['get'], url_path="definite-car", permission_classes=[AllowAny])
    def get_definite_car(self, request, pk=None):
        try:
            instance = Car.objects.get(car_id=pk)
            serializer = self.get_serializer(instance)
            result = serializer.data
        except:
            result = ''

        return Response(result)

    @action(detail=False, methods=['get'], url_path="clients-cars", permission_classes=[
        IsAuthenticated])
    def get_clients_cars(self, request, pk=None):
        try:
            queryset = Car.objects.filter(client=request.GET['id'])
            serializer = CarSerializer(queryset, many=True)
            result = serializer.data
        except:
            result = ''

        return Response(result)

    @action(detail=False, methods=['get'], url_path="service-companies-cars", permission_classes=[
        IsAuthenticated])
    def get_service_companies_cars(self, request, pk=None):
        try:
            instance = ServiceCompany.objects.get(login_nickname=request.GET['name'])
            queryset = Car.objects.filter(service_company=instance)
            serializer = CarSerializer(queryset, many=True)
            result = serializer.data
        except:
            result = ''

        return Response(result)


class MaintenanceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = MaintenanceSerializer
    queryset = Maintenance.objects.all()

    @action(detail=False, methods=['get'], url_path="clients-maintenance", permission_classes=[
        IsAuthenticated])
    def get_clients_maintenance(self, request, pk=None):
        try:
            cars = Car.objects.filter(client=request.GET['id'])
            queryset = Maintenance.objects.filter(car_id__in=cars)
            serializer = MaintenanceSerializer(queryset, many=True)
            result = serializer.data
        except:
            result = ''

        return Response(result)

    @action(detail=False, methods=['get'], url_path="service-companies-maintenance", permission_classes=[
        IsAuthenticated])
    def get_service_companies_maintenance(self, request, pk=None):
        try:
            instance = ServiceCompany.objects.get(login_nickname=request.GET['name'])
            queryset = Maintenance.objects.filter(service_company=instance)
            serializer = MaintenanceSerializer(queryset, many=True)
            result = serializer.data
        except:
            result = ''

        return Response(result)


class ComplaintViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ComplaintSerializer
    queryset = Complaint.objects.all()

    @action(detail=False, methods=['get'], url_path="clients-complaints", permission_classes=[
        IsAuthenticated])
    def get_clients_complaints(self, request, pk=None):
        try:
            cars = Car.objects.filter(client=request.GET['id'])
            queryset = Complaint.objects.filter(car_id__in=cars)
            serializer = ComplaintSerializer(queryset, many=True)
            result = serializer.data
        except:
            result = ''

        return Response(result)

    @action(detail=False, methods=['get'], url_path="service-companies-complaints", permission_classes=[
        IsAuthenticated])
    def get_service_companies_complaints(self, request, pk=None):
        result = ''
        if request.GET['name']:
            try:
                instance = ServiceCompany.objects.get(login_nickname=request.GET['name'])
                queryset = Complaint.objects.filter(service_company=instance)
                serializer = ComplaintSerializer(queryset, many=True)
                result = serializer.data
            except:
                result = ''

        return Response(result)


class UserInfoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = UserSerializer
    queryset = User.objects.all()


class VehicleViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()


class EngineViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = EngineSerializer
    queryset = Engine.objects.all()


class TransmissionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = TransmissionSerializer
    queryset = Transmission.objects.all()


class DrivingAxleViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = DrivingAxleSerializer
    queryset = DrivingAxle.objects.all()


class SteeringAxleViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = SteeringAxleSerializer
    queryset = SteeringAxle.objects.all()


class MaintenanceTypeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = MaintenanceTypeSerializer
    queryset = MaintenanceType.objects.all()


class BreakageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = BreakageSerializer
    queryset = Breakage.objects.all()


class RepairViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = RepairSerializer
    queryset = Repair.objects.all()


class ServiceCompanyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ServiceCompanySerializer
    queryset = ServiceCompany.objects.all()

    @action(detail=True, methods=['get'], url_path="service-company-id", permission_classes=[AllowAny])
    def get_id_if_user(self, request, pk=None):
        try:
            instance = User.objects.get(id=pk)
            current_id = ServiceCompany.objects.get(login_nickname=instance.username).id
            print(current_id)
            if current_id:
                result = current_id
            else:
                result = 0
        except:
            print('Error...Current user is not Service company...')
            result = 0

        return Response(result)


# Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="Сервисное обслуживание погрузчиков",
        default_version='v1',
        description="Use methods below for data access",

    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def my_login(request):
    return Response(
        UserSerializer(request.user).data
    )

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_definite_car(request):
#     result = ''
#     if request.GET['car_id']:
#         try:
#             instance = Car.objects.get(car_id=request.GET['car_id'])
#             serializer = CarSerializer(instance)
#             result = serializer.data
#         except:
#             result = ''
#
#     return Response(result)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_clients_cars(request):
#     result = ''
#     if request.GET['id']:
#         try:
#             queryset = Car.objects.filter(client=request.GET['id'])
#             serializer = CarSerializer(queryset, many=True)
#             result = serializer.data
#         except:
#             print('error')
#             result = ''
#
#     return Response(result)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_service_companies_cars(request):
#     result = ''
#     if request.GET['name']:
#         try:
#             instance = ServiceCompany.objects.get(login_nickname=request.GET['name'])
#             queryset = Car.objects.filter(service_company=instance)
#             serializer = CarSerializer(queryset, many=True)
#             result = serializer.data
#         except:
#             print('error')
#             result = ''
#
#     return Response(result)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_clients_maintenance(request):
#     result = ''
#     if request.GET['id']:
#         try:
#             cars = Car.objects.filter(client=request.GET['id'])
#             queryset = Maintenance.objects.filter(car_id__in=cars)
#             serializer = MaintenanceSerializer(queryset, many=True)
#             result = serializer.data
#         except:
#             print('error')
#             result = ''
#
#     return Response(result)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_service_companies_maintenance(request):
#     result = ''
#     if request.GET['name']:
#         try:
#             instance = ServiceCompany.objects.get(login_nickname=request.GET['name'])
#             queryset = Maintenance.objects.filter(service_company=instance)
#             serializer = MaintenanceSerializer(queryset, many=True)
#             result = serializer.data
#         except:
#             print('error')
#             result = ''
#
#     return Response(result)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_clients_complaints(request):
#     result = ''
#     if request.GET['id']:
#         try:
#             cars = Car.objects.filter(client=request.GET['id'])
#             queryset = Complaint.objects.filter(car_id__in=cars)
#             serializer = ComplaintSerializer(queryset, many=True)
#             result = serializer.data
#         except:
#             print('error')
#             result = ''
#
#     return Response(result)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_service_companies_complaints(request):
#     result = ''
#     if request.GET['name']:
#         try:
#             instance = ServiceCompany.objects.get(login_nickname=request.GET['name'])
#             queryset = Complaint.objects.filter(service_company=instance)
#             serializer = ComplaintSerializer(queryset, many=True)
#             result = serializer.data
#         except:
#             print('error')
#             result = ''
#
#     return Response(result)
