from django.contrib import admin
from .models import Car, Maintenance, Complaint, Vehicle, Engine, Transmission, DrivingAxle, SteeringAxle,\
    MaintenanceType, Breakage, Repair, ServiceCompany

admin.site.register(Car)
admin.site.register(Maintenance)
admin.site.register(Complaint)
admin.site.register(Vehicle)
admin.site.register(Engine)
admin.site.register(Transmission)
admin.site.register(DrivingAxle)
admin.site.register(SteeringAxle)
admin.site.register(MaintenanceType)
admin.site.register(Breakage)
admin.site.register(Repair)
admin.site.register(ServiceCompany)
