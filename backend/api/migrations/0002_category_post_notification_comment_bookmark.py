from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('image', models.FileField(blank=True, null=True, upload_to='image')),
                ('slug', models.SlugField(blank=True, null=True, unique=True)),
            ],
            options={
                'verbose_name_plural': 'Category',
            },
        ),
    ]