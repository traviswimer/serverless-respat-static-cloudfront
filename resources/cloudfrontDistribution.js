module.exports = function cloudfrontDistribution({
	pattern_name,
	domain,
	region,
	use_https,
	default_root_object,
	certificate_arn,
	origins
}) {
	// Create array of cache behaviors
	let cache_behaviors = origins.map((origin) => {
		return {
			"AllowedMethods": [
				"DELETE",
				"GET",
				"HEAD",
				"OPTIONS",
				"PATCH",
				"POST",
				"PUT"
			],
			DefaultTTL: 0,
			MaxTTL: 0,
			"ForwardedValues": {
				"Cookies": {
					"Forward": "all"
				},
				"Headers": [
					"Referer", "Accept", "Content-Type", "Authorization"
				],
				"QueryString": true
			},
			"PathPattern": origin.path_pattern,
			"TargetOriginId": `${pattern_name}${origin.id}`,
			"ViewerProtocolPolicy": use_https === true
				? "redirect-to-https"
				: "allow-all"
		}
	});

	// Create array of origins
	let distribution_origins = origins.map((origin) => {
		return {
			"DomainName": origin.domain,
			"Id": `${pattern_name}${origin.id}`,
			"OriginPath": origin.path,
			"CustomOriginConfig": {
				"HTTPPort": "80",
				"HTTPSPort": "443",
				"OriginProtocolPolicy": use_https === true
					? "https-only"
					: "http-only"
			}
		}
	});

	// Add the static S3 bucket origin
	distribution_origins.unshift({
		"DomainName": `${domain}.s3-website-${region}.amazonaws.com`,
		"Id": `${pattern_name}S3Origin`,
		"CustomOriginConfig": {
			"HTTPPort": "80",
			"HTTPSPort": "443",
			"OriginProtocolPolicy": "http-only"
		}
	});

	return {
		"Type": "AWS::CloudFront::Distribution",
		"Properties": {
			"DistributionConfig": {
				"Aliases": [domain],
				"Comment": `Cloudfront Distribution pointing to ${domain} S3 bucket`,
				"CacheBehaviors": cache_behaviors,
				"DefaultCacheBehavior": {
					"AllowedMethods": [
						"GET", "HEAD"
					],
					"Compress": true,
					DefaultTTL: 0,
					MaxTTL: 0,
					"TargetOriginId": `${pattern_name}S3Origin`,
					"ForwardedValues": {
						"QueryString": true,
						"Cookies": {
							"Forward": "none"
						}
					},
					"ViewerProtocolPolicy": use_https === true
						? "redirect-to-https"
						: "allow-all"
				},
				"DefaultRootObject": default_root_object,
				"Enabled": true,
				"HttpVersion": "http2",
				"IPV6Enabled": true,
				"Origins": distribution_origins,
				"PriceClass": "PriceClass_100",
				"ViewerCertificate": use_https === true
					? {
						"AcmCertificateArn": certificate_arn,
						"SslSupportMethod": "sni-only"
					}
					: undefined
			}
		}
	};
};
