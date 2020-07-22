from django.db import models

# Create your models here.
class Project(models.Model):
    projectName = models.CharField(max_length=200)

    def getName(self):
        return self.projectName