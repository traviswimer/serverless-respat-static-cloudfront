'use strict';
module.exports = {
	"service": "TEST_ONLY",
	"package": {
		exclude: ['node_modules/**', '!node_modules/aws-sdk/**', '!node_modules/aws-lambda-ses-forwarder/**']
	},
	"provider": {
		"name": "aws",
		"runtime": "nodejs8.10"
	},
	"functions": {
	},
	"resources": {
		"Resources": {

		}
	},
	"plugins": [
		"serverless-respat"
	],
	"custom": {
		"serverless-respat": {
			prefix: "${self:service}",
			patterns: [
				{
					pattern: require("../index"),
					config: {
						domain: "not.a.domain.nope",
						region: 'us-east-1',
						use_https: true,
						default_root_object: "index.html",
						certificate_arn: 'not:a:real:arn',
						origins: [
							{
								id: "ApiOrigin",
								path: "/stage",
								domain: "api.gateway.url",
								path_pattern: "api/*"
							}
						]
					}
				}
			]
		}
	}
}
