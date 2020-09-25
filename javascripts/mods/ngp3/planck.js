let pl = {
	setup() {
		let data = {
			on: false,
			conf: true,
			layer: 1
		}

		this.save = data
		return data
	},
	compile() {
		let data = player.pl
		this.save = data
	},
	updateTmp() {
		let data = {}
		this.tmp = data
	},
	can() {
		return GDs.can()
	},
	reqText() {
		return GDs.reqText()
	},
	click() {
		if (!this.can()) return
		if (this.save.conf && !confirm(this.conf)) return
		if (!this.did()) for (let x = 0; x < this.warnings.length; x++) if (!confirm(this.warnings[x])) retur

		this.save.on = !this.save.on
		giveAchievement("ng3p111")
	},
	conf: "Reducing everything to Planck Length resets everything except all your milestones, Automator Ghosts, and Gravity Dimensions, which gives you a large buff to Ghostify content. However, you will take a big challenge. So, are you ready?",
	warnings: [
		"Are you sure you want to do this? You will lose everything you have!",
		"ARE YOU REALLY SURE YOU WANT TO DO THAT? BE WARNED, YOU WILL TAKE A BIG CHALLENGE. THIS IS REALLY YOUR LAST CHANCE!"
	],
	did() {
		return player.achievements.includes("ng3p111")
	},
}