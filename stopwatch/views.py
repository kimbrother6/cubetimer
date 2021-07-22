from django.shortcuts import render

# Create your views here.
def stop_watch(request):
    return render(request, 'stopwatch.html')