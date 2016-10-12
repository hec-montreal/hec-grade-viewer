package ca.hec.gradeviewer.entity;

import lombok.Getter;

@Getter
public class GradeImpl implements Grade {

	private Double value;
	private String formattedValue;
	private String comment;
	private boolean published;

	public GradeImpl(String formattedValue, String comment, boolean published) {
		this.formattedValue = formatValue(formattedValue);
		this.value = tryExtractValue(this.formattedValue);
		this.comment = comment;
		this.published = published;
	}

	public GradeImpl(String value, String formattedValue, String comment, boolean published) {
		this.value = tryExtractValue(formatValue(value));
		this.formattedValue = formatValue(formattedValue);
		this.comment = comment;
		this.published = published;
	}

	private static Double tryExtractValue(String value) {
		try {
			return Double.parseDouble(value);
		} catch (NumberFormatException e) {
			return null;
		}
	}

	private static String formatValue(String value) {
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
