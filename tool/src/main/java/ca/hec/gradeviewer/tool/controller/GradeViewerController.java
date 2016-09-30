package ca.hec.gradeviewer.tool.controller;

import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.user.api.UserNotDefinedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import ca.hec.gradeviewer.GradeViewerService;
import ca.hec.gradeviewer.entity.User;
import ca.hec.gradeviewer.tool.entity.GradesResponse;

@Controller
public class GradeViewerController {

	@Autowired
	private GradeViewerService gradeViewerService;

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public ModelAndView getIndexPage() throws UserNotDefinedException, JsonProcessingException {
		return new ModelAndView("index");
	}

	@RequestMapping(value = "/{matricule}/grades", method = RequestMethod.GET)
	public @ResponseBody String getUserGrades(@PathVariable(value = "matricule") String matricule) throws UserNotDefinedException, JsonProcessingException, IdUnusedException {
		User user = gradeViewerService.getUserByMatricule(matricule);

		GradesResponse ret = new GradesResponse();

		ret.setUser(user);
		ret.setCourses(gradeViewerService.getUserCourses(user));

		ObjectMapper mapper = new ObjectMapper();

		mapper.configure(SerializationFeature.INDENT_OUTPUT, true);

		return mapper.writeValueAsString(ret);
	}
}
