let ngmR = {
	setup() {
		player.aarexModifications.ngmR = 1 
	},
	compile() {
		tmp.ngmR = player.aarexModifications.ngmR !== undefined
	},
	cost_scales: {
		nds: 1.2,
		ts: 1.3
	}
}