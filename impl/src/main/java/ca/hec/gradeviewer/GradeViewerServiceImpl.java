package ca.hec.gradeviewer;

import java.util.ArrayList;
import java.util.List;

import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.service.gradebook.shared.CommentDefinition;
import org.sakaiproject.service.gradebook.shared.GradebookService;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.user.api.UserDirectoryService;
import org.sakaiproject.user.api.UserNotDefinedException;

import ca.hec.gradeviewer.entity.Assignment;
import ca.hec.gradeviewer.entity.AssignmentImpl;
import ca.hec.gradeviewer.entity.Course;
import ca.hec.gradeviewer.entity.CourseImpl;
import ca.hec.gradeviewer.entity.Grade;
import ca.hec.gradeviewer.entity.GradeImpl;
import ca.hec.gradeviewer.entity.AcademicSession;
import ca.hec.gradeviewer.entity.AcademicSessionImpl;
import ca.hec.gradeviewer.entity.User;
import ca.hec.gradeviewer.entity.UserImpl;

public class GradeViewerServiceImpl implements GradeViewerService {

	private UserDirectoryService userDirectoryService = null;

	private SiteService siteService = null;

	private GradebookService gradebookService = null;

	@Override
	public List<AcademicSession> getSessions() {
		List<AcademicSession> ret = new ArrayList<>();

		ret.add(new AcademicSessionImpl("H2016"));
		ret.add(new AcademicSessionImpl("E2016"));
		ret.add(new AcademicSessionImpl("A2016"));

		return ret;
	}

	@Override
	public User getUserByMatricule(String matricule) throws UserNotDefinedException {
		return new UserImpl(userDirectoryService.getUserByEid(matricule));
	}

	@Override
	public Site getSakaiSiteById(String id) throws IdUnusedException {
		return siteService.getSite(id);
	}

	@Override
	public List<Course> getUserCourses(User user) {
		List<Course> ret = new ArrayList<>();

		for (org.sakaiproject.site.api.Site sakaiSite : siteService.getUserSites(true, user.getId())) {
			if (!gradebookService.isGradebookDefined(sakaiSite.getId())) {
				continue;
			}

			Course course = new CourseImpl(sakaiSite);

			ret.add(course);

			for (org.sakaiproject.service.gradebook.shared.Assignment sakaiAssignment : gradebookService.getAssignments(course.getId())) {
				Assignment assignment = new AssignmentImpl(sakaiAssignment);
				String value = gradebookService.getAssignmentScoreString(sakaiSite.getId(), sakaiAssignment.getId(), user.getId());
				CommentDefinition comment = gradebookService.getAssignmentScoreComment(sakaiSite.getId(), sakaiAssignment.getId(), user.getId());

				Grade grade = new GradeImpl(value, comment == null ? "" : comment.getCommentText(), true);

				assignment.setGrade(grade);

				course.getAssignments().add(assignment);
			}
		}

		return ret;
	}

	public void setUserDirectoryService(UserDirectoryService userDirectoryService) {
		this.userDirectoryService = userDirectoryService;
	}

	public void setSiteService(SiteService siteService) {
		this.siteService = siteService;
	}

	public void setGradebookService(GradebookService gradebookService) {
		this.gradebookService = gradebookService;
	}
}
