export default
	{
		"app_short_name": "sdlta-frontend",
		"app_full_name": "SDLTA Frontend Challenge",
		"home_currency_code": "USD",
		"exchange_rate_source_currency_code": "USD",
		"currency_precision": 2,
		"exchange_rate_precision": 4,
		"exchange_rate_stochasticity": 1.5,
		"traded_currencies": [
			{
				"code": "USD",
				"initial_balance": 100000
			},
			{
				"code": "CAD",
				"initial_balance": 10000
			},
			{
				"code": "EUR",
				"initial_balance": 10000
			},
			{
				"code": "AED",
				"initial_balance": 10000
			},
			{
				"code": "PKR",
				"initial_balance": 10000
			},
			{
				"code": "INR",
				"initial_balance": 10000
			},
			{
				"code": "RUB",
				"initial_balance": 10000
			},
			{
				"code": "GBP",
				"initial_balance": 10000
			}
		],
		"defaults": {
			"exchange_refresh_rate": 60,
			"commission_percentage": 5,
			"minimum_commission": 2.5,
			"surcharge": 2,
			"low_balance_percentage": 25
		}
	}