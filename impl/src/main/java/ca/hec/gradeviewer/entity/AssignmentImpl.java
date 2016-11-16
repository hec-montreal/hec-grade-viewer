package ca.hec.gradeviewer.entity;

import java.util.Date;

import ca.hec.gradeviewer.util.DateUtil;
import lombok.Getter;
import lombok.Setter;

@Getter
public class AssignmentImpl implements Assignment {

	private String id;
	private String name;
	private long date;
	private String categoryId;
	private String categoryName;
	private double points;

	@Setter
	private Grade grade;

	public AssignmentImpl(org.sakaiproject.service.gradebook.shared.Assignment assignment) {
		this.id = assignment.getId().toString();
		this.name = assignment.getName();
		this.points = assignment.getPoints();
		this.date = assignment.getDueDate() != null ? assignment.getDueDate().getTime() : 0;
		this.categoryId = assignment.getCategoryId() == null ? "" : assignment.getCategoryId().toString();
		this.categoryName = assignment.getCategoryName() == null ? "" : assignment.getCategoryName();
	}

	@Override
	public String getFormattedDate() {
		if (date == 0) {
			return "";
		}

		return DateUtil.formatDate(new Date(date));
	}
}
