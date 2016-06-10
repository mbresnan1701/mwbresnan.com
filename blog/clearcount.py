from .models import Limit


def reset_count():
    limit = Limit.objects.all()[0]
    limit.count = 0
    limit.save()


reset_count()
