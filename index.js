module.exports = {
	name: "StaticCloudfront",
	resources: {
		CloudfrontDistribution: require('./resources/cloudfrontDistribution')
	},
	default_config: {
		use_https: true
	},
	required_props: [
		"domain",
		"region",
		"default_root_object",
		"certificate_arn",
		"origins"
	]
};
