# Generated by Django 4.2.3 on 2023-08-06 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0007_alter_car_car_id_alter_car_driving_axle_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='maintenance',
            name='order_id',
            field=models.CharField(max_length=32, unique=True, verbose_name='Номер заказ-наряда'),
        ),
    ]