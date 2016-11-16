package ca.hec.gradeviewer.entity;

import lombok.Getter;

@Getter
public class AcademicSessionImpl implements AcademicSession {

	private String code;

	public AcademicSessionImpl(String code) {
		this.code = code;
	}

	@Override
	public String getName() {
		return code;
	}
}
