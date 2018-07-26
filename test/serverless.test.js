const cloudformation_template = require('./.serverless/cloudformation-template-update-stack.json');

describe('serverless packaging', () => {
	test('generates correct cloudformation template', () => {
		expect(cloudformation_template).toMatchSnapshot();
	});
});
