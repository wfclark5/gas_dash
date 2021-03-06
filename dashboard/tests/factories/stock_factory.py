import factory
from datetime import datetime
from ...models import Stock


class StockFactory(factory.django.DjangoModelFactory):
	class Meta:
		model = Stock

	name = 'test'
	ticker = 'DIS' # Needs a real ticker for testing requests
	quantity = 1
	invested = 10
	fees_usd = 2.99
	status = 'a'