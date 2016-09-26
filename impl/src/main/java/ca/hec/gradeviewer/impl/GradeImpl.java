package ca.hec.gradeviewer.impl;

import ca.hec.gradeviewer.api.Grade;

public class GradeImpl implements Grade {

	private String value;

	public GradeImpl(String value) {
		this.value = value;
	}

	@Override
	public String getValue() {
		return value;
	}
}
