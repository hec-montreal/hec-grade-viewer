package ca.hec.gradeviewer.entity;

import java.util.ArrayList;
import java.util.List;

import org.sakaiproject.service.gradebook.shared.CourseGrade;

import ca.hec.gradeviewer.util.StringUtil;
import lombok.Getter;

@Getter
public class CourseImpl implements Course {

	private String id;
	private String title;
	private String description;
	private AcademicSession session;
	private String number;
	private List<Assignment> assignments;
	private Grade courseGrade;

	public CourseImpl(org.sakaiproject.site.api.Site site) {
		this.assignments = new ArrayList<>();

		this.id = site.getId();
		this.title = site.getTitle();
		this.description = StringUtil.valOrEmptyString(site.getProperties().getProperty("title"));
		this.session = new AcademicSessionImpl(StringUtil.valOrEmptyString(site.getProperties().getProperty("term")));
		this.number = this.title;
	}

	public void setCourseGrade(CourseGrade courseGrade) {
		this.courseGrade = new GradeImpl(courseGrade.getCalculatedGrade(), courseGrade.getMappedGrade(), "", true);
	}
}
