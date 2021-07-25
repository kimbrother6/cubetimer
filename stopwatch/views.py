from django.shortcuts import redirect, render
from .models import Solve
import simplejson as json
from django.http import HttpResponse
from random import randint

# Create your views here.
def stop_watch(request):
    scrambles_json = open('stopwatch/Scrambles.json')
    scrambles = json.load(scrambles_json)
    scrambles_json.close()

    return render(request, 'stopwatch.html', {'scramble': scrambles[randint(0, len(scrambles) - 1)]})

def create_solve(request):
    solveing_time = float(request.GET['solveing_time'])
    print(request)
    solveing_time = Solve(
      solveing_time = solveing_time,
      scramble = request.GET['scramble'],
    )
    solveing_time.save()
    context = {
      'hello': 'world'
    }
    return HttpResponse(json.dumps(context), content_type='application/json')
