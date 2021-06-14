import {
	Drawer,
	Input,
	Col,
	Select,
	Form,
	Row,
	Button,
	Spin
} from 'antd';
import { addNewStudent } from "./client";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { successNotification, errorNotification } from "./Notification";

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function StudentDrawerForm({ showDrawer, setShowDrawer, fetchStudents }) {
	const onClose = () => setShowDrawer(false);
	const [submitting, setSubmitting] = useState(false);

	const onFinish = student => {
		setSubmitting(true);
		console.log(JSON.stringify(student, null, 2));	
		addNewStudent(student)
			.then(() => {
				console.log("student added");
				onClose();
				successNotification('Student Successfully Added', `${student.name} was added.`);
				fetchStudents();
			}).catch(e => e.response.json()
				.then(response => errorNotification('ERROR', `[STATUS CODE: ${response.status}] [${response.error}] [${response.message}]`, 'bottomLeft'))
			).finally(() => setSubmitting(false));

		};

	const onFinishedFailed = errorInfo => alert(JSON.stringify(errorInfo, null, 2));

	return <Drawer
		title="Create New Student"
		width={720}
		onClose={onClose}
		visible={showDrawer}
		bodyStyle={{ paddingBottom: 80 }}
		footer={
			<div style={{ textAlign: 'right' }}>
				<Button onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>
			</div>
		}
	>
		<Form
			layout="vertical"
			onFinishFailed={onFinishedFailed}
			onFinish={onFinish}
			hideRequiredMark>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						name="name"
						label="Name"
						rules={[{ required: true, message: 'Please enter student name' }]}
					>
						<Input placeholder="Please enter student name" />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name="email"
						label="Email"
						rules={[{ required: true, message: 'Please enter student email' }]}
					>
						<Input placeholder="Please enter student email" />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						name="gender"
						label="Gender"
						rules={[{ required: true, message: 'Please select a gender' }]}
					>
						<Select placeholder="Please select a gender">
							<Option value="MALE">MALE</Option>
							<Option value="FEMALE">FEMALE</Option>
							<Option value="OTHER">OTHER</Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				{submitting && <Spin indicator={antIcon} />}
			</Row>
		</Form>
	</Drawer>;
}

export default StudentDrawerForm;
