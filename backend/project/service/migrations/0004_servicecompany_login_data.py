# Generated by Django 4.2.3 on 2023-08-02 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0003_alter_vehicle_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='servicecompany',
            name='login_data',
            field=models.CharField(blank=True, max_length=64),
        ),
    ]
