let ngmR = {
	setup() {
		tmp.ngmR = true
		player.aarexModifications.ngmR = 1

		resetNormalDimensionCostMults()
		resetTickspeed()
	},
	compile() {
		tmp.ngmR = player.aarexModifications.ngmR !== undefined
	},
	cost_scales: {
		nds: 1.2,
		ts: 1.3
	}
}