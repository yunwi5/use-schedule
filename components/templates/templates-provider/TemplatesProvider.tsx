import React, { useEffect, Fragment, useMemo } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery, useQueryClient } from "react-query";

import { templateActions } from "../../../store/redux/template-slice";
import { Template } from "../../../models/template-models/Template";

const API_DOMAIN = "/api/templates";

const TemplatesProvider: React.FC = (props) => {
	const userContext = useUser();
	const userId = userContext.user ? userContext.user.sub : null;

	const queryClient = useQueryClient();
	const { data, error } = useQuery(
		[ "templates", userId ],
		async () => {
			return fetch(`${API_DOMAIN}/`)
				.then((res) => res.json())
				.catch((err) => console.log(err.message));
		},
		{ enabled: !!userId }
	);
	if (error) console.log(error);

	const templatesData: Template[] = useMemo(() => (data ? data.templates : []), [ data ]);

	const { updateCount } = useSelector((state: RootStateOrAny) => state.template);
	const dispatch = useDispatch();

	useEffect(
		() => {
			queryClient.invalidateQueries("templates");
		},
		[ queryClient, updateCount ]
	);

	useEffect(
		() => {
			dispatch(templateActions.setTemplates(templatesData));
		},
		[ dispatch, templatesData ]
	);

	return <Fragment>{props.children}</Fragment>;
};

export default TemplatesProvider;
