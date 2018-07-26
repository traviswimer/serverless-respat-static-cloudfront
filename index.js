module.exports = {
	name: "StaticCloudfront",
	resources: {
		CloudfrontDistribution: require('./resources/cloudfrontDistribution')
	}
};
