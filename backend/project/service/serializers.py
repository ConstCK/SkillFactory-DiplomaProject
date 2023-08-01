from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Car, Maintenance, Complaint, Vehicle, Engine, Transmission, DrivingAxle, SteeringAxle, \
    MaintenanceType, Breakage, Repair, ServiceCompany


class VehicleSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField()

    class Meta:
        model = Vehicle
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        fields = ['username', "groups"]


class EngineSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField()

    class Meta:
        model = Engine
        fields = '__all__'


class TransmissionSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField()

    class Meta:
        model = Transmission
        fields = '__all__'


class DrivingAxleSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField()

    class Meta:
        model = DrivingAxle
        fields = '__all__'


class SteeringAxleSerializer(serializers.ModelSerializer):
    verbose_name = serializers.CharField()

    class Meta:
        model = SteeringAxle
        fields = '__all__'


class MaintenanceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceType
        fields = '__all__'


class BreakageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breakage
        fields = '__all__'


class RepairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repair
        fields = '__all__'


class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    vehicle_model_details = serializers.CharField()
    engine_model_details = serializers.CharField()
    transmission_model_details = serializers.CharField()
    driving_axle_model_details = serializers.CharField()
    steering_axle_model_details = serializers.CharField()

    class Meta:
        model = Car
        fields = '__all__'


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = '__all__'


class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'
        read_only_fields = ['down_time']