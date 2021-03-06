# Generated by Django 2.1 on 2018-09-12 20:15

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('name', models.CharField(max_length=200)),
                ('user_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.Profile')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='portfolio',
            unique_together={('user_profile', 'name')},
        ),
    ]
