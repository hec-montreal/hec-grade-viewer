package ca.hec.gradeviewer.entity;

import lombok.Getter;

@Getter
public class GradeImpl implements Grade {

	private String value;
	private String comment;
	private boolean published;

	public GradeImpl(String value, String comment, boolean published) {
		this.value = value;
		this.comment = comment;
		this.published = published;
	}

	@Override
	public String getFormattedValue() {
		if (value == null) {
			return "";
		}

		return value.replaceAll(",", ".");
	}

	@Override
	public boolean isNull() {
		return value == null;
	}
}
