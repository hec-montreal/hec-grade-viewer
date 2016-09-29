package ca.hec.gradeviewer;

import java.util.List;

import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.user.api.UserNotDefinedException;

import ca.hec.gradeviewer.entity.Course;
import ca.hec.gradeviewer.entity.User;

public interface GradeViewerService {

	public User getUserByMatricule(String matricule) throws UserNotDefinedException;

	public Site getSakaiSiteById(String id) throws IdUnusedException;

	public List<Course> getUserCourses(User user);
}
