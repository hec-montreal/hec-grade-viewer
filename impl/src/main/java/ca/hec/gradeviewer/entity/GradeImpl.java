package ca.hec.gradeviewer.entity;

import ca.hec.gradeviewer.util.StringUtil;
import lombok.Getter;

@Getter
public class GradeImpl implements Grade {

	private Double value;
	private String letter;
	private String comment;
	private boolean published;

	public GradeImpl(String value, String comment, boolean published) {
		this.value = tryExtractValue(value);
		this.letter = "";
		this.comment = comment;
		this.published = published;

		hideValueIfUnpublished();
	}

	public GradeImpl(String value, String letter, String comment, boolean published) {
		this(value, comment, published);

		this.letter = letter;

		hideValueIfUnpublished();
	}

	@Override
	public String getFormattedValue() {
		return StringUtil.formatGrade(value);
	}

	@Override
	public boolean isNull() {
		return value == null;
	}

	private void hideValueIfUnpublished() {
		if (!published) {
			value = null;
			letter = "";
		}
	}

	private static Double tryExtractValue(String value) {
		return StringUtil.parseGrade(value);
	}
}
