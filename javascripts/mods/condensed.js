let CONDENSED = {
	setup() {
		player.aarexModifications.ngp3c = 1
		player.condensed = {}

		ngC.resetNDs()
	},
	compile() {
		tmp.ngC = player.condensed !== undefined
	},
	updateTmp() {
		let data = {}
		ngC.tmp = data
		if (!tmp.ngC) return

		data.nds = []
		for (let i = 1; i <= 8; i++) data.nds[i] = ngC.condense.nds.eff(i)
	},
	resetDims(type) {
		let data = [0]
		for (var d = 1; d <= 8; d++) data.push(0)
		player.condensed[type] = data
	},
	resetNDs(type) {
		ngC.resetDims("normal")
	},
	condense: {
		nds: {
			start: {
				1: 100,
				2: 1e4,
				3: 1e8,
				4: 1e16,
				5: 1e32,
				6: 1e45,
				7: 1e65,
				8: 1e80,
			},
			base: {
				1: 10,
				2: 25,
				3: 100,
				4: 1e4,
				5: 1e8,
				6: 1e10,
				7: 1e15,
				8: 1e20,
			},
			cost(x) {
				let bought = player.condensed.normal[x]
				return Decimal.pow(this.base[x], Decimal.pow(bought, 2.5)).times(this.start[x])
			},
			target(x) {
				let res = getOrSubResource(x)
				return Math.floor(Math.pow(res.div(this.start[x]).max(1).log10() / Math.log10(this.base[x]), 1 / 2.5) + 1)
			},
			pow() {
				let pow = 1
				if (player.galaxies >= 2) pow *= 4/3
				return pow
			},
			eff(x) {
				return Decimal.pow(player.money.plus(1).log10() + 1, player.condensed.normal[x] * this.pow())
			},
			update(x) {
				let costPart = ph.did("quantum") ? '' : 'Condense: '
				let cost = this.cost(x)
				let resource = getOrSubResource(x)
				document.getElementById("Condense" + x).textContent = costPart + shortenPreInfCosts(cost)
				document.getElementById("Condense" + x).className = resource.gte(cost) ? 'storebtn' : 'unavailablebtn'
			},
			buy(x) {
				let res = getOrSubResource(x)
				let cost = this.cost(x)
				if (res.lt(cost)) return;
				getOrSubResource(x, cost)
				player.condensed.normal[x]++
			},
			max(x) {
				let res = getOrSubResource(x)
				let cost = this.cost(x)
				if (res.lt(cost)) return
				player.condensed.normal[x] = Math.max(player.condensed.normal[x], this.target(x))
				getOrSubResource(x, cost)
			}
		}
	},
	getSacrificeExpBoost() {
		let x = 1
		if (player.resets >= 6) x *= 1.5
		if (player.galaxies >= 1) x *= 1.75
		return x
	}
}
let ngC = CONDENSED