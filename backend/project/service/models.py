from django.contrib.auth.models import User
from django.db import models


class Vehicle(models.Model):
    name = models.CharField(max_length=256, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    @property
    def verbose_name(self):
        return self._meta.verbose_name.title()

    class Meta:
        verbose_name = 'Модель погрузчика'
        verbose_name_plural = 'Модели погрузчика'


class Engine(models.Model):
    name = models.CharField(max_length=256, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name
    @property
    def verbose_name(self):
        return self._meta.verbose_name.title()

    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модели двигателя'


class Transmission(models.Model):
    name = models.CharField(max_length=256, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    @property
    def verbose_name(self):
        return self._meta.verbose_name.title()

    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модели трансмиссии'


class DrivingAxle(models.Model):
    name = models.CharField(max_length=256, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    @property
    def verbose_name(self):
        return self._meta.verbose_name.title()

    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модели ведущего моста'


class SteeringAxle(models.Model):
    name = models.CharField(max_length=256, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    @property
    def verbose_name(self):
        return self._meta.verbose_name.title()

    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модели управляемого моста'


class MaintenanceType(models.Model):
    name = models.CharField(max_length=256, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Вид ТО'
        verbose_name_plural = 'Виды ТО'


class Breakage(models.Model):
    name = models.CharField(max_length=256, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Характер отказа'
        verbose_name_plural = 'Характер отказа'


class Repair(models.Model):
    name = models.CharField(max_length=256, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Способ восстановления'
        verbose_name_plural = 'Способы восстановления'


class ServiceCompany(models.Model):
    name = models.CharField(max_length=256, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Сервисная компания'
        verbose_name_plural = 'Сервисные компании'


class Car(models.Model):
    car_id = models.CharField(max_length=32, verbose_name='Зав. № машины')
    vehicle_model = models.ForeignKey('Vehicle', on_delete=models.PROTECT, verbose_name='Модель техники')
    engine_model = models.ForeignKey('Engine', on_delete=models.PROTECT, verbose_name='Модель двигателя')
    engine_id = models.CharField(max_length=32, verbose_name='Зав. № двигателя')
    transmission_model = models.ForeignKey('Transmission', on_delete=models.PROTECT, verbose_name='Модель трансмиссии')
    transmission_id = models.CharField(max_length=32, verbose_name='Зав. № трансмиссии')
    driving_axle_model = models.ForeignKey('DrivingAxle', on_delete=models.PROTECT,
                                           verbose_name='Модель ведущего моста')
    driving_axle_id = models.CharField(max_length=32, verbose_name='Зав. № ведущего моста')
    steering_axle_model = models.ForeignKey('SteeringAxle', on_delete=models.PROTECT,
                                            verbose_name='Модель управляемого моста')
    steering_axle_id = models.CharField(max_length=32, verbose_name='Зав. № управляемого моста')
    delivery_contract = models.CharField(max_length=256, verbose_name='Договор поставки №, дата')
    discharge_date = models.DateField(verbose_name='Дата отгрузки с завода')
    receiver = models.CharField(max_length=256, verbose_name='Грузополучатель')
    delivery_address = models.CharField(max_length=256, verbose_name='Адрес поставки')
    vehicle_configuration = models.CharField(max_length=512, verbose_name='Комплектация')
    client = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Клиент')
    service_company = models.ForeignKey('ServiceCompany', on_delete=models.PROTECT, verbose_name='Сервисная компания')

    def __str__(self):
        return f'Погрузчик - {self.car_id}'

    @property
    def vehicle_model_details(self):
        return Vehicle.objects.get(name=self.vehicle_model).name

    @property
    def engine_model_details(self):
        return Engine.objects.get(name=self.engine_model).name

    @property
    def transmission_model_details(self):
        return Transmission.objects.get(name=self.transmission_model).name

    @property
    def driving_axle_model_details(self):
        return DrivingAxle.objects.get(name=self.driving_axle_model).name

    @property
    def steering_axle_model_details(self):
        return SteeringAxle.objects.get(name=self.steering_axle_model).name

    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'
        ordering = ['-discharge_date']


class Maintenance(models.Model):
    car_id = models.ForeignKey('Car', on_delete=models.PROTECT, verbose_name='Машина')
    service_company = models.ForeignKey('ServiceCompany', on_delete=models.PROTECT, verbose_name='Сервисная компания')
    maintenance_type = models.ForeignKey('MaintenanceType', on_delete=models.PROTECT, verbose_name='Вид ТО')
    maintenance_date = models.DateField(verbose_name='Дата проведения ТО')
    running_time = models.IntegerField(verbose_name='Наработка м/час')
    order_id = models.CharField(max_length=32, verbose_name='Номер заказ-наряда')
    order_date = models.DateField(verbose_name='Дата заказ-наряда')

    def __str__(self):
        return f'Техническое обслуживание {self.car_id} модели'

    class Meta:
        verbose_name = 'Техническое обслуживание'
        verbose_name_plural = 'Техническое обслуживание'
        ordering = ['-maintenance_date']


class Complaint(models.Model):
    car_id = models.ForeignKey('Car', on_delete=models.PROTECT, verbose_name='Машина')
    service_company = models.ForeignKey('ServiceCompany', on_delete=models.PROTECT, verbose_name='Сервисная компания')
    breakage_date = models.DateField(verbose_name='Дата отказа')
    breakage_type = models.ForeignKey('Breakage', on_delete=models.PROTECT, verbose_name='Узел отказа')
    breakage_description = models.TextField(verbose_name='Описание отказа')
    running_time = models.IntegerField(verbose_name='Наработка м/час')
    repairing_way = models.ForeignKey('Repair', on_delete=models.PROTECT, verbose_name='Способ восстановления')
    spares = models.CharField(max_length=256, verbose_name='Используемые запасные части')
    repair_date = models.DateField(verbose_name='Дата восстановления')
    down_time = models.IntegerField(verbose_name='Время простоя')

    def save(self, *args, **kwargs):
        self.down_time = (self.repair_date - self.breakage_date).days
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Рекламации по {self.car_id} модели'

    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'
        ordering = ['-breakage_date']
