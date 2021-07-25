from django.db import models

# Create your models here.
class Solve(models.Model):
    solveing_time = models.FloatField()
    scramble = models.CharField(max_length=200, null=True, blank=True)

    dt_created = models.DateField(auto_now_add=True)
    dt_modified = models.DateTimeField(auto_now = True)

    def __float__(self):
        return self.solveing_time