""" Portfolio model for users overall holdings """
import json
import ast
import statistics
from django.db import models
from .trade_model import Trade
from .stock_model import Stock
from django.contrib.postgres.fields import JSONField

class Portfolio(models.Model):
	""" POrtfolio model defintion for users overall holdings """
	user_profile = models.ForeignKey('dashboard.Profile', on_delete=models.CASCADE)
	data = JSONField()
	name = models.CharField(max_length=200)
	benchmark_name = models.CharField(max_length=200, null=True)
	benchmark_ticker = models.CharField(max_length=5, null=True)
	def __str__(self):
		return self.name

	def latest_day_data(self):
		""" Returns latest data for the given portfolio """
		data_str = ast.literal_eval(self.data)
		data = json.loads(data_str)
		days = len(data)
		latest = data[-1]
		latest['days'] = days
		gains = [d['pct_gain'] for d in data]
		bench_gains = [d['bench_gain_pct'] for d in data]
		latest['mean'] = statistics.mean(gains)
		latest['bench_mean'] = statistics.mean(bench_gains)
		latest['cv'] = statistics.stdev(gains)/statistics.mean(gains)
		latest['bench_cv'] = statistics.stdev(bench_gains)/statistics.mean(bench_gains)
		return latest

	def earliest_trade(self):
		""" Return the earliest trade in the portfolio """
		stocks = Stock.objects.filter(user_profile=self.user_profile)
		trades = [stock.trades() for stock in stocks if stock.trades()]
		# find earliest trade date in group here

	class Meta:
		unique_together = ('user_profile', 'name')
