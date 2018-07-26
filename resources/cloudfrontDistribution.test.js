const cloudfrontDistribution = require('./cloudfrontDistribution');

describe('cloudfrontDistribution()', () => {
	var config;
	beforeEach(() => {
		config = {
			prefix: "ThePrefix",
			pattern_name: "ThePatternName",
			domain: "TheDomain",
			region: "TheRegion",
			use_https: true,
			default_root_object: "TheRootObject",
			certificate_arn: "TheCertArn",
			origins: [
				{
					id: "TheOriginId",
					path: "/origin-path",
					domain: "the-origin-domain",
					path_pattern: "the-path-pattern/*"
				}
			]
		}
	});

	test('generates HTTPS distribution', () => {
		expect(cloudfrontDistribution(config)).toMatchSnapshot();
	});

	test('generates HTTP distribution', () => {
		config.use_https = false;
		expect(cloudfrontDistribution(config)).toMatchSnapshot();
	});
});
