const cloudfrontDistribution = require('./resources/cloudfrontDistribution');

module.exports = function serverlessRespatStaticCloudfront({config, serverless}) {
	config.pattern_name = config.pattern_name || "StaticCloudfront";

	let resources = {
		[`${config.pattern_name}CloudfrontDistribution`]: cloudfrontDistribution(config)
	};

	return {
		resources
	};
};
