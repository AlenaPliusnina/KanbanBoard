from django.contrib.auth import get_user_model
from django.db import models
User = get_user_model()


class Column(models.Model):
    NAME = [
        (1, 'ON HOLD'),
        (2, 'IN PROGRESS'),
        (3, 'NEEDS REVIEW'),
        (4, 'APPROVED')
    ]

    name = models.SmallIntegerField(choices=NAME, default=1)
    tasks_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return str(self.name)


class Task(models.Model):
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    column = models.ForeignKey(Column,  on_delete=models.CASCADE)

    def __str__(self):
        return self.description
