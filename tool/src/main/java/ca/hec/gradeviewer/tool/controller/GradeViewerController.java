package ca.hec.gradeviewer.tool.controller;

import java.util.List;

import org.sakaiproject.site.api.Site;
import org.sakaiproject.user.api.User;
import org.sakaiproject.user.api.UserNotDefinedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import ca.hec.gradeviewer.api.GradeViewerService;
import ca.hec.gradeviewer.tool.entities.GradesResponse;

@Controller
public class GradeViewerController {

	@Autowired
	private GradeViewerService gradeViewerService;

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public ModelAndView getIndexPage() throws UserNotDefinedException, JsonProcessingException {
		User user = gradeViewerService.getUserByMatricule("simon");
		List<Site> sites = gradeViewerService.getUserSites(user);

		GradesResponse gr = new GradesResponse();

		gr.setUserId(user.getId());
		gr.setSites(sites);

		ObjectMapper mapper = new ObjectMapper();
		mapper.enable(SerializationFeature.INDENT_OUTPUT);

		ModelAndView ret = new ModelAndView("index");

		ret.addObject("json", mapper.writeValueAsString(gr));

		return ret;
	}
}
