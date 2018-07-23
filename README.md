# serverless-respat-static-cloudfront
> Resource pattern to setup a Cloudfront distribution for a static site hosted on S3.

## Usage

This package is intended for use with the **serverless-respat plugin**. ([install/usage info](https://github.com/traviswimer/serverless-respat)).

Install:

`npm install --save-dev serverless-respat-static-cloudfront`

Add patterns to the "custom" object in your serverless config file:

```javascript
"custom": {
	"serverless-respat": {
		prefix: "${self:service}-${opt:stage}",
		patterns: [
			{
				pattern_function: require("serverless-respat-static-cloudfront"),
				config: {

				}
			}
		]
	}
}
```

**You will need to setup Route53 (or other DNS service) to point to the Cloudfront resource created**

## Config options
**pattern_name** - (string) A pattern name included in resource names. *DEFAULT: "StaticCloudfront"*
